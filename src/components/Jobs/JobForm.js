import React, { useState } from 'react';
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Fab,
  CircularProgress
} from '@mui/material';
import CreatableSelect from 'react-select/creatable';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import NavigationIcon from '@mui/icons-material/Navigation';
import templet from '../image/templet.jpg';
import { useForm } from "react-hook-form";
import Input from '../Input/Input';
import { postJob } from '../../services/job-services';

function JobForm(props) {
  const { setShowForm } = props
  const { register, handleSubmit } = useForm();

  const [selectedCandidateEmails, setSelectedCandidateEmails] = useState([]);
  const [options, setOptions] = useState([]);
  const [laoding,setloading] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleChange = (newValue) => {
    setSelectedCandidateEmails(newValue);
  };

  const handleCreate = (inputValue) => {
    const newOption = { label: inputValue, value: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedCandidateEmails((prevSelected) => [...prevSelected, newOption]);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    setOpenModal(false);
  };

  const onSubmit = async (data) => {
    try {
      setloading(true);
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")
      console.log({ data, selectedTemplate, selectedCandidateEmails });

      const response = await postJob({
        ...data,
        candidateEmails: selectedCandidateEmails,
        templateName: selectedTemplate || "job",
        companyId: id
      }, token)
      if (response.status === 201) {
        alert("Job created!")
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error during API call:', error);
    }
    finally{

      setloading(false);
    }
  };

  if(laoding){
    return <CircularProgress />
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[100%]">
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Title:</label>
          <Input name="title"
            label="Enter Job Title"
            register={register}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Job Description:</label>
          <Input
            name="description"
            label="Enter Job Description"
            register={register}
            multiline
            rows={4}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Experience Level:</label>
          <Input
            name="experience"
            type="number"
            label="Select Experience Level"
            register={register}
          />
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4">Add Candidate:</label>
          <div className="w-full">
            <CreatableSelect
              isMulti
              {...register("candidateEmails")}
              value={selectedCandidateEmails}
              onChange={handleChange}
              onCreateOption={handleCreate}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex items-start gap-4">
          <label className="w-1/4 ">End Date:</label>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register("endDate")}
          />
        </div>

        <div className="flex justify-end items-end gap-5 mt-3">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab variant="extended" size="medium" onClick={handleOpenModal}>
              <AttachEmailIcon sx={{ mr: 1 }} />
              Email Template
            </Fab>
            <b>{selectedTemplate}</b>
            <Fab variant="extended" size="medium" color="primary" type='submit'>
              <NavigationIcon sx={{ mr: 1 }} />
              Send
            </Fab>
          </Box>
        </div>

      </form>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Select an Email Template</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <Button onClick={() => handleSelectTemplate('job')}>
              <img src={templet} alt="Template 1" width="200" height="3100" />
            </Button>

          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default JobForm;
