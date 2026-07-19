import uuid
import aiofiles
import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/api/v1", tags=["Scan"])

# Temporary upload directory — do not process in main thread
TEMP_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "tmp", "uploads")
os.makedirs(TEMP_DIR, exist_ok=True)

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE_MB = 10


@router.post("/scan", summary="Upload a crop image for spectral analysis")
async def upload_scan(file: UploadFile = File(...)) -> JSONResponse:
    """
    Accepts a crop image upload from the mobile client.

    - Validates content type and file size.
    - Saves the file asynchronously to a secure temp directory with a UUID-based filename.
    - Returns a standardized job receipt for downstream processing.
    """

    # --- Validation ---
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail={
                "status": "error",
                "code": "UNSUPPORTED_MEDIA_TYPE",
                "message": f"File type '{file.content_type}' is not accepted. Use JPEG, PNG, or WebP.",
            },
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail={
                "status": "error",
                "code": "FILE_TOO_LARGE",
                "message": f"File exceeds the {MAX_FILE_SIZE_MB}MB size limit.",
            },
        )

    # --- Secure UUID-based Filename ---
    extension = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
    job_id = str(uuid.uuid4())
    secure_filename = f"{job_id}.{extension}"
    file_path = os.path.join(TEMP_DIR, secure_filename)

    # --- Async File Write (non-blocking) ---
    async with aiofiles.open(file_path, "wb") as out_file:
        await out_file.write(contents)

    # --- Standardized JSON Response ---
    return JSONResponse(
        status_code=202,
        content={
            "status": "accepted",
            "message": "Crop image received. Spectral analysis has been queued.",
            "data": {
                "job_id": job_id,
                "original_filename": file.filename,
                "stored_as": secure_filename,
                "file_size_kb": round(len(contents) / 1024, 2),
                "content_type": file.content_type,
                "processing_status": "queued",
            },
        },
    )
