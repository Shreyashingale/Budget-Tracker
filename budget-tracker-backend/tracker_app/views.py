from rest_framework import viewsets
from .models import Transaction, Category, Budget
from .serializers import TransactionSerializer, CategorySerializer, BudgetSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]  # ✅ Enforce auth
    queryset = Transaction.objects.all()

    def get_queryset(self):
        # ✅ Only return transactions belonging to the authenticated user
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # ✅ Automatically assign user during save
        serializer.save(user=self.request.user)
        print(f"✅ Transaction created by: {self.request.user}")



class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAuthenticated]  # ✅ requires login
    # def list(self, request, *args, **kwargs):
    #     print("🔐 Request User:", request.user)
    #     print("🧾 Auth Header:", request.META.get("HTTP_AUTHORIZATION"))
    #     return super().list(request, *args, **kwargs)


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'], url_path='current')
    def current(self, request):
        month = request.query_params.get('month')
        year = request.query_params.get('year')

        if not month or not year:
            return Response({'error': 'month and year are required'}, status=400)

        try:
            budget = Budget.objects.get(user=request.user, month=month, year=year)
            serializer = self.get_serializer(budget)
            return Response(serializer.data)
        except Budget.DoesNotExist:
            return Response({}, status=204)  # No content
