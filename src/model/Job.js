const Database = require('../db/config'); 

module.exports = {
    async get(){
        const db = await Database();

        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close();

        return jobs.map(job => ({
           
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at,
        }));
    },

    async update(updateJob, jobId){
        const db = await Database()
        const parseTotalHours = parseInt(updateJob["total-hours"]) ?? 0
        const parseDailylHours = isNaN(updateJob["daily-hours"]) ? parseInt(updateJob["daily-hours"]) : 0
        console.log({ tets: isNaN(updateJob["daily-hours"]) });

        console.log({ parseTotalHours, parseDailylHours });

        try {
            await db.run(`UPDATE jobs SET
            name="${updateJob.name}",
            daily_hours=${parseDailylHours},
            total_hours=${parseTotalHours}
            WHERE id=${jobId}
        `)
        } catch (error) {
            console.log({ error });
        }

        await db.close()
       
    },

    async delete(id){
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${id}`) 

        await db.close()
    },

    async create(newJob){
        const db = await Database()

        await db.run(`INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
        ) VALUES (
            "${newJob.name}",  
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}

        )`)

        await db.close()
       
    },
};
