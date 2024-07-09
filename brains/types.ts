type Exercise = {
    id: number | null,
    title: string,
    sets: number,
    reps: number,
    weight: number,
    unit: string,
    rest: number,
    notes: string
}

type Workout = {
    workout_id: number,
    title: string,
    notes: string,
    exercises: Exercise[]
    duration: number
}