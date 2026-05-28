import os
from pathlib import Path
from fastapi import UploadFile

UPLOAD_DIR = os.getenv('UPLOAD_DIR', './backend/uploads')
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)


def save_upload(file: UploadFile) -> str:
    filename = os.path.basename(file.filename)
    target_path = os.path.join(UPLOAD_DIR, filename)
    with open(target_path, 'wb') as buffer:
        buffer.write(file.file.read())
    return target_path
