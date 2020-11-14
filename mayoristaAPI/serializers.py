from rest_framework import serializers

class PartidaSerializer(serializers.Serializer):
    producto = serializers.CharField(required=True, allow_blank=True, max_length=100)
    nombre  =  serializers.CharField(required=True, allow_blank=False, max_length=100)
    stock  =   serializers.IntegerField(default=0)
    
    def validate(self, data):
        if data['stock'] <= 0:
            raise serializers.ValidationError('No valen stocks negativos')
        return data
