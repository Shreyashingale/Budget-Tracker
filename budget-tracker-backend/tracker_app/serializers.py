from rest_framework import serializers
from .models import Transaction, Category, Budget

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['user']  # 👈 Important!

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['user', 'month', 'year', 'amount']
        read_only_fields = ['user']  # Set 'user' to read-only

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user  # Set the user from the request
        return super().create(validated_data)