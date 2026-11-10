#Función auxiliar para reconstruir la contraseña

def reconstruir_contrasena(first_name: str, username: str, last_name: str) -> str:
    """
    Regla de negocio:
    1ra letra del primer nombre (MAYÚS) + username + 1ra letra del primer apellido (MAYÚS)
    Ejemplo: 'Luis Carlos', '1234567', 'Pérez López' -> 'L1234567P'
    """
    primer_nombre = first_name.strip().split()[0] if first_name else ""
    primer_apellido = last_name.strip().split()[0] if last_name else ""

    letra_nombre = primer_nombre[0].upper() if primer_nombre else ""
    letra_apellido = primer_apellido[0].upper() if primer_apellido else ""
    user_str = str(username).strip()

    return f"{letra_nombre}{user_str}{letra_apellido}"
