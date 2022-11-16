import express from 'express'

const router = express.Router()

router.get('/', (req: any, res: any) => {
  res.json({
    msg: `Welcome to POSH's backend ! \n Everything looks good so far ...`,
  })
})

export default router
