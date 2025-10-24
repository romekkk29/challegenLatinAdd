# react-challenge-v2

Ver https://hackmd.io/@33424kC_SAymSM87bryuNw/S14zZWJRgg


#Challenge Romeo Gomez 


<img width="1889" height="702" alt="image" src="https://github.com/user-attachments/assets/f5ace799-6688-4da2-b446-4878eb15c183" />


# 1) Guardar horarios de funcionamiento en las pantallas (desafío funcional)


<img width="797" height="802" alt="image" src="https://github.com/user-attachments/assets/91d4d7a3-e4f2-462b-917c-84f2fbbea0fe" />

<img width="894" height="596" alt="image" src="https://github.com/user-attachments/assets/38a83d17-3ce8-461d-b7a1-a13b82399e25" />

<img width="1575" height="783" alt="image" src="https://github.com/user-attachments/assets/d632526e-f25a-4ed9-963f-22a71df08206" />

<img width="1104" height="573" alt="image" src="https://github.com/user-attachments/assets/252c65de-f553-4250-920c-f5ad6a59adac" />

# 2) Generar un dashboard de ventas

<img width="1633" height="843" alt="image" src="https://github.com/user-attachments/assets/02f46d4e-0606-4c8e-a2c7-01c7e2bb1602" />

<img width="1587" height="852" alt="image" src="https://github.com/user-attachments/assets/d927f506-fdb2-491a-a606-0dedfd05aaf9" />


# 4)Implementar una nueva funcionalidad (desafío creativo opcional)

Cartel de notificaciones por falta de pago (actualizacion cada 15 segundos)
<img width="1892" height="774" alt="image" src="https://github.com/user-attachments/assets/b061cb6f-84d5-417d-afd9-c5d9f201dfc4" />
Se agrego tabla y registros por defecto para mostrar la feature

        -- Nueva tabla: estado de pago (payment_status)
        CREATE TABLE IF NOT EXISTS payment_status (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            display_id INTEGER NOT NULL,
            status BOOLEAN NOT NULL DEFAULT 0,
            FOREIGN KEY (display_id) REFERENCES displays(id)
        );
        
CONSIDERACION:> si tenes la db creada, para que funcione deberias eliminarla y que la cree de nuevo el sistema, ya que es un cambio de DB
CONSIDERACION DE MEJOR:> Todos los horarios estan de forma local, se deberia tener todo en UTC en caso de trabajar internacionalment, no lo realice asi porque no fue pedido
