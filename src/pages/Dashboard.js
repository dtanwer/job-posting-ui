import { Button, Divider, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import JobForm from '../components/Jobs/JobForm.js';
import Sidebar from '../components/Jobs/Sidebar.js';

function Dashboard() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <Divider />
            <div className="flex flex-1">
                <Sidebar />

                {showForm && (
                    <div className="fixed inset-0 flex items-center justify-start bg-white bg-opacity-5 ml-[14%]">
                        <div className="bg-white p-3 h-[70%]  rounded-md w-[60%] ">
                            <JobForm setShowForm={setShowForm} />
                        </div>
                    </div>
                )}
                {!showForm && (
                    <div className="flex flex-col p-4 w-full">
                        <Button
                            variant="contained"
                            color="primary"
                            className="mb-4 self-start"
                            onClick={() => setShowForm(true)}
                        >
                            Create Interview
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
