// db/workout.ts
// Ce fichier contient les fonctions pour manipuler les données des workouts dans la base de donnees.
// Auteur : Paul Agudze, Thomas Garneau

import pool from '@/app/lib/db/db';

export async function createWorkout(
    userId: string,
    workout: {exercises: any[], title: string, notes: string, duration: number},
){
    let exerciseIds :number[] = [];
    const exercises = workout.exercises;

    for (const exercise of exercises) {
        exercise.user_id = userId;
        if (exercise.id) {
            exerciseIds.push(exercise.id);
        } else {
            delete exercise.id;
            try {
                const insertedExercise = await pool.gym_exercices_test.create({
                    data: exercise,
                });
                exerciseIds.push(insertedExercise.exercice_id);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const workoutData = {
        user_id: userId,
        title: workout.title,
        notes: workout.notes,
        duration: workout.duration,
        exercises: exerciseIds,
    };

    try {
        const insertedWorkout = await pool.workouts_test.create({
            data: {
                user_id: Number(userId),
                title: workoutData.title,
                notes: workoutData.notes,
                duration: workoutData.duration,
                exercises: exerciseIds,
            }
        });
        return insertedWorkout;
    } catch (error) {
        console.log(error);
    }

}


export async function getWorkouts(userId: string) {
    const workouts = await pool.workouts_test.findMany({
        where: {
            user_id: Number(userId),
        }
    });
    return workouts;
}

export async function getWorkoutExercise(
    userId: string,
    workout: {exercises: number[]}
) {
    try {
        // @ts-ignore
        const exercises = await pool.gym_exercices_test.findMany({
            where: {
                exercice_id: {
                    in : workout.exercises
                }
            }
        });
        return exercises;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteWorkout(
    userId: string,
    workout: {workout_id: number},
) {
    try {
        await pool.workouts_test.delete({
            where: {
                workout_id: workout.workout_id,
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function setCompleteWorkout(
    userId: string,
    data : {
        workout_id: number,
        completed_at: Date,
        duration: number,
        notes: string,
    }
) {
    try {
        const completedWorkout = await pool.completed_workouts.create({
            data: {
                // @ts-ignore
                user_id: userId,
                workout_id: data.workout_id,
                completed_at: data.completed_at,
                duration: data.duration,
                notes: data.notes,
            }
        });
        return completedWorkout;
    } catch (error) {
        console.log(error);
    }
}

export async function getCompletedWorkouts(userId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    try {
        return await pool.completed_workouts.findMany({
            where: {
                // @ts-ignore
                user_id: userId,
                completed_at: {
                    gte: sevenDaysAgo,
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function scheduleWorkout(
    userId: string,
    data: {
        workout_id: number,
        is_recurring: boolean,
        recuring_period: string,
        date: Date,
    }
) {
    try {
        console.log('Data', data)
        const scheduledWorkout = await pool.workouts_test.update({
            data: {
                // @ts-ignore
                is_recurring: data.is_recurring,
                recuring_period: data.recuring_period,
                date : data.date
            },
            where: {
                workout_id: data.workout_id,
                user_id: Number(userId),
            }
        });
        return scheduledWorkout;
    } catch (error) {
        console.log(error);
    }
}