# modulo_seguimiento/utils/csv_export.py

import csv
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from modulo_seguimiento.utils.csv_utils import escape_quotes

class ExportarCSVBaseView(APIView):
    permission_classes = ()
    queryset = None
    serializer_class = None
    filename = "export.csv"
    filtros = None  # lista de Q objects a aplicar

    def get_queryset(self):
        return self.queryset

    def get_serializer_class(self):
        return self.serializer_class

    def get_filename(self):
        return self.filename

    def post(self, request):
        if self.filtros is None:
            raise NotImplementedError("Debes definir self.filtros en la vista hija.")

        # Aplicar los filtros recibidos desde el frontend
        queryset = self.get_queryset().filter(*self.filtros).select_related('id_estudiante').order_by('fecha')
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)

        if not serializer.data:
            return Response({"message": "No hay datos para exportar", "datos": []}, status=200)

        # Crear la respuesta para CSV
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{self.get_filename()}"'

        # Definir los nombres de las columnas
        fieldnames = [field for field in serializer.child.fields]

        # Escribir el archivo CSV
        writer = csv.DictWriter(response, fieldnames=fieldnames, quoting=csv.QUOTE_MINIMAL)
        writer.writeheader()

        # Escapar comillas dobles en los campos de cada fila antes de escribirlas en el CSV
        for row in serializer.data:
            # Asegurarse de escapar las comillas dobles en todos los campos de texto
            for key in row:
                if isinstance(row[key], str):
                    row[key] = escape_quotes(row[key])
            writer.writerow(row)

        return response
