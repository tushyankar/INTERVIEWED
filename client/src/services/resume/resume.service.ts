import api from '@/services/api/api';

export const resumeService = {
  upload(file: File) {
    const formData = new FormData();

    formData.append('resume', file);

    return api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getAll() {
    return api.get('/resume');
  },

  getById(id: string) {
    return api.get(`/resume/${id}`);
  },

  delete(id: string) {
    return api.delete(`/resume/${id}`);
  },

  setActive(id: string) {
    return api.patch(`/resume/${id}/activate`);
  },

  download(id: string) {
    return api.get(`/resume/${id}/download`, {
      responseType: 'blob',
    });
  },
};
