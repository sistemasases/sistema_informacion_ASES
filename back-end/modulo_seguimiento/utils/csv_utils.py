# modulo_seguimiento/utils/csv_utils.py

#Reemplaza comillas dobles por comillas dobles duplicados en un texto.
# Útil para evitar errores en formatos como CSV o SQL.
def escape_quotes(text):
    """Escapa las comillas dobles dentro del texto correctamente."""
    if isinstance(text, str):
        # Sustituye las comillas dobles por dos comillas dobles
        return text.replace('"', '""')
    return text