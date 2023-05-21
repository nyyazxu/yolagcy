import api from './network';

const register = async (user: any) => {
  return await api.post('/register', {...user});
};

const login = async (user: any) => {
  return await api.post('/login', {...user});
};

export {register, login};
