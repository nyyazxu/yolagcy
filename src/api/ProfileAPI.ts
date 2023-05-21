import api from './network';

const updateUser = async (user: any, file: any) => {
  const formData = new FormData();

  formData.append('user', JSON.stringify(user));

  if (file) {
    formData.append('carImage', file);
  }

  return await api.put('/users', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export {updateUser};
