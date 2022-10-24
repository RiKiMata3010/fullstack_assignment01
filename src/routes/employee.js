const express = require('express');
const Employee = require('../schema/employee');
const router = express.Router();

router.post('/create', (req, res) => {
    const newEmployee = new Employee(req.body);
    newEmployee.save();
    res.status(201).json({
        message: 'employee created'
    })
});

router.get('/', async(req, res)=>{
    const employees = await Employee.find()
    res.status(200).json(employees);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (employee == null) {
    return res.status(400).json(false)
  } else {
    return res.status(200).json(employee)
  }
})

// update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findOneAndUpdate({ _id: id }, req.body)
    if (employee == null) {
      return res.status(400).json(false)
    } else {
      return res.status(200).json(employee)
    }
  })
  
  // delete
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.deleteOne({ _id: id });
  
    if (employee == null) {
      return res.status(400).json(false)
    } else {
      return res.status(204).json(employee)
    }
  })
module.exports = router;