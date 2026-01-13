"""
Custom validators for file uploads
"""
from django.core.exceptions import ValidationError


def validate_image_size(image):
    """
    Validates that image size does not exceed 5MB
    """
    max_size = 5 * 1024 * 1024  # 5MB
    if image.size > max_size:
        raise ValidationError("Resim boyutu 5MB'ı geçemez.")


def validate_image_type(image):
    """
    Validates that uploaded file is an allowed image type
    """
    allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    
    if hasattr(image, 'content_type'):
        if image.content_type not in allowed_types:
            raise ValidationError("Sadece JPEG, PNG ve WebP formatları kabul edilir.")




