"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';  // Import Table component from react-bootstrap

// Define an interface for the data structure
interface UsageStatistic {
    resource: string;
    hits: number;
}

function UsageStatistics() {
    const [usageStatistics, setUsageStatistics] = useState<UsageStatistic[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/admin/statistics');
                setUsageStatistics(response.data);
            } catch (error) {
                console.error('Error fetching usage statistics:', error);
            }
        };
        fetchData();
    }, []); // Fetch data when component mounts

    return (
        <div className="d-flex justify-content-center">
            <div>
                <h1 className="text-center mt-4">Usage Statistics</h1>
                {usageStatistics.length === 0 && (
                    <p className="text-center">Statistics are loading...</p>
                )}
                {usageStatistics.length > 0 && (
                    <Table striped bordered hover responsive="sm" className='mt-3'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Resource</th>
                                <th>Hits</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usageStatistics.map((statistic, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{statistic.resource}</td>
                                    <td>{statistic.hits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default UsageStatistics;
