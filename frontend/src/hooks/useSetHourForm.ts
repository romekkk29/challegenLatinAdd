import { useState } from "react";
import { ScreenAvailableHours,Interval } from "types/screen";
import dayjs, { Dayjs } from "dayjs";

type Args = {
    setDaySelected: React.Dispatch<React.SetStateAction<ScreenAvailableHours>>,
}

export const useSetHourForm = ({setDaySelected}:Args)=>{
    //Validamos un error en los intervalos de tiempo
    const [error, setError] = useState<string | null>(null);

    const validateIntervals = (interval:Interval[]) => {
        const intervals = interval || [];

        // Convertimos a minutos desde medianoche para comparar fácilmente
        const toMinutes = (time: string) => {
            const [h, m] = time.split(":").map(Number);
            return h * 60 + m;
        };

        // 1. Validar cada intervalo: from < to
        for (const { from, to } of intervals) {
            if (toMinutes(from) >= toMinutes(to)) {
            setError("El intervalo debe ser correcto: un 'desde' menor a un 'hasta'.");
            return false;
            }
        }

        // 2. Validar solapamientos
        const sorted = [...intervals].sort(
            (a, b) => toMinutes(a.from) - toMinutes(b.from)
        );

        for (let i = 0; i < sorted.length - 1; i++) {
            const currentEnd = toMinutes(sorted[i].to);
            const nextStart = toMinutes(sorted[i + 1].from);
            if (currentEnd > nextStart) {
            setError("Los intervalos no pueden compartir horario.");
            return false;
            }
        }

        // Si pasa todas las validaciones
        setError(null);
        return true;
    };
    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setDaySelected((prev) => ({
            ...prev,
            enable: checked,
            interval:
                checked && (!prev.interval || prev.interval.length === 0)
                ? [{ from: "00:01", to: "00:01" }]
                : prev.interval,
            }
        ));
    };
    //  Cambiar hora "desde" o "hasta" de un rango
    const handleChangeTime = (
        index: number,
        field: "from" | "to",
        newValue: Dayjs | null
    ) => {
        if (!newValue) return;

        const formatted = newValue.format("HH:mm"); // formato 24h
        setDaySelected((prev) => {
            const updated = [...(prev.interval || [])];
            updated[index] = { ...updated[index], [field]: formatted };
            return { ...prev, interval: updated };
        });
    };

    //  Agregar nuevo rango
    const handleAddInterval = () => {
        setDaySelected((prev) => ({
            ...prev,
            interval: [...(prev.interval || []), { from: "00:00", to: "00:00" }],
            }
        ));
    };

    //  Eliminar un rango
    const handleRemoveInterval = (index: number) => {
        setDaySelected((prev) => ({
            ...prev,
            interval: (prev.interval || []).filter((_, i) => i !== index),
            }
        ));
    };
    const resetError=() =>{
        setError(null)
    }

    return {error,resetError,validateIntervals,handleChangeSwitch,handleChangeTime,handleAddInterval,handleRemoveInterval}
    }