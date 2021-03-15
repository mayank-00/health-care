import jobs from 'data/jobs'

const indexing = {}

export default async (req, res) => {

  if (req.method != "GET") {
    return res.status(501).end();
  }

  // @todo: implement filters and search
  // @todo: implement automated tests

  let searchKeyword = req.query.search

  if (!searchKeyword || searchKeyword === "") {
    return res.status(200).json({ jobs: jobs })
  }

  if (new RegExp("[&<>\"\'\/]").test(searchKeyword)) {
    return res.status(400).end()
  }

  let jobsArrayToReturn = []

  if (indexing.hasOwnProperty(searchKeyword)) {

    let indexArr = indexing[searchKeyword]

    indexArr.map(value => {

      if (typeof value === "number") {
        jobsArrayToReturn.push(jobs[value])
        return
      }

      let retJob = {}, job = jobs[value.jobIndex], itemsIndexes = value.itemsIndexes

      retJob.name = job.name
      retJob.total_jobs_in_hospital = itemsIndexes.length
      retJob.job_title = job.items[itemsIndexes[0]]
      retJob.items = []

      itemsIndexes.map((ind, loopIndex) => {
        retJob.items[loopIndex] = job.items[ind]
      })

      jobsArrayToReturn.push(retJob)
    })
  } else {

    let indexArr = [], searchRegex = new RegExp(searchKeyword, "i")

    for (let i = 0, jLen = jobs.length; i < jLen; i++) { // iterate over jobs

      let job = jobs[i]

      if (job.name.match(searchRegex)) { // if company name includes search word means every item has it include all and move to next
        indexArr.push(i)
        jobsArrayToReturn.push(job)
        continue
      }

      let retJob = {
        name: job.name,
        items: []
      }

      let foundItemIndexes = []

      for (let items = job.items, j = 0, iLen = items.length; j < iLen; j++) { // iterate over job item

        for (let iVals = Object.values(items[j]), k = 0, kLen = iVals.length; k < kLen; k++) { // iterate every field in item object

          let fieldValue = iVals[k]

          if (Array.isArray(fieldValue)) {
            if (typeof fieldValue[0] === "string") {
              let found = false
              for (let l = 0, lLen = fieldValue.length; l < lLen; l++) {
                if (searchRegex.test(fieldValue[l])) {
                  retJob.items.push(items[j])
                  foundItemIndexes.push(j)

                  found = true
                  break
                }
              }
              if (found) break
            }
            continue
          }

          if (searchRegex.test(fieldValue.toString())) {
            retJob.items.push(items[j])
            foundItemIndexes.push(j)
            break
          }

        }

      }

      if (foundItemIndexes.length) {
        retJob.total_jobs_in_hospital = foundItemIndexes.length
        retJob.job_title = retJob.items[0].job_title
        jobsArrayToReturn.push(retJob)
        indexArr.push({ jobIndex: i, itemsIndexes: foundItemIndexes })
      }
    }

    indexing[searchKeyword] = indexArr

  }

  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  res.status(200).json({ jobs: jobsArrayToReturn })
}
