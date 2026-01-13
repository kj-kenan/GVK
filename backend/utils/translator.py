"""
Translation utility using LibreTranslate
"""
import requests
from django.conf import settings


def translate_to_english(text_tr):
    """
    Translates Turkish text to English using LibreTranslate
    
    Args:
        text_tr (str): Turkish text to translate
    
    Returns:
        str: Translated English text or empty string on failure
    """
    if not text_tr or not text_tr.strip():
        return ""
    
    try:
        url = f"{settings.LIBRETRANSLATE_URL}/translate"
        payload = {
            "q": text_tr,
            "source": "tr",
            "target": "en",
            "format": "text"
        }
        
        response = requests.post(url, json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            return data.get('translatedText', '')
        else:
            print(f"Translation API error: {response.status_code}")
            return ""
            
    except requests.exceptions.RequestException as e:
        print(f"Translation request failed: {e}")
        return ""
    except Exception as e:
        print(f"Translation error: {e}")
        return ""


def auto_translate_model_fields(instance, field_pairs):
    """
    Helper function to auto-translate multiple field pairs in a model instance
    
    Args:
        instance: Model instance
        field_pairs: List of tuples [(tr_field_name, en_field_name), ...]
    
    Returns:
        bool: True if any translation was performed
    """
    translated = False
    
    for tr_field, en_field in field_pairs:
        tr_value = getattr(instance, tr_field, None)
        en_value = getattr(instance, en_field, None)
        
        # Only translate if Turkish field has content and English field is empty
        if tr_value and not en_value:
            translated_text = translate_to_english(tr_value)
            if translated_text:
                setattr(instance, en_field, translated_text)
                translated = True
    
    return translated




