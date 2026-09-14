from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveRequest
        fields = "__all__"
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_year(self, value):
        if value < 1 or value > 4:
            raise serializers.ValidationError("Year must be between 1 and 4.")
        return value

    def validate(self, data):
        start = data.get("from_date", getattr(self.instance, "from_date", None))
        end = data.get("to_date", getattr(self.instance, "to_date", None))

        if start and end and end < start:
            raise serializers.ValidationError(
                {"to_date": "To date cannot be earlier than from date."}
            )

        return data
