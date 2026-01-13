from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from .models import ContactMessage
from .serializers import ContactMessageSerializer


@method_decorator(ratelimit(key='ip', rate='5/m', method='POST'), name='post')
class ContactMessageCreateView(generics.CreateAPIView):
    """
    API endpoint for contact form submission
    Rate-limited to 5 submissions per minute per IP
    """
    permission_classes = [AllowAny]
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    'message': 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
                    'message_en': 'Your message has been sent successfully! We will get back to you as soon as possible.'
                },
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




