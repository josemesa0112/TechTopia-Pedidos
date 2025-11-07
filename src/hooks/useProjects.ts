import { useEffect, useState } from 'react';
import { getProjects } from '@/utils/api';

const data = [
  {
    id: '5kma53ae',
    effortEstimation: 874,
    status: 'success',
    category: 'Silas22@example.com',
    projectName: 'Project Delta',
    description: 'Description for Project Delta',
    projectManager: 'Silas',
    client: 'Innovatech',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    projectName: 'Automatización de Facturación Electrónica',
    description:
      'Implementación de un sistema automatizado para generar, validar y enviar facturas electrónicas a la DIAN.',
    category: 'FULLSTACK',
    projectManagerId: '1231231233',
    startDate: '2025-10-30T18:31:08.000Z',
    endDate: '2026-01-22T18:31:11.000Z',
    createdAt: '2025-10-30T18:32:02.000Z',
    updatedAt: '2025-10-30T18:31:53.000Z',
    createdBy: '1231231233',
    deleted: false,
    effortEstimation: 480,
    clientId: 'client-001',
    status: 'PLANNING',
  },
];
export const useProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    getProjects()
      .then((data) => {
        console.log('data :>> ', data);
        const projects = data.map((project: any) => ({
          id: project.id,
          effortEstimation: project.effortEstimation,
          status: project.status,
          category: project.category,
          projectName: project.projectName,
          description: project.description,
          projectManager: project.projectManager.username + ' ' + project.projectManager.lastname,
          client: project.client.name,
        }));

        setProjects(projects);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch projects' + err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return { projects, loading, error, refetch: fetchProjects };
};
