import api from './network';

const createRoute = async (driverId: any, route: any) => {
  return await api.post('/routes', {driverId, ...route});
};

const updateRoute = async (driverId: any, route: any) => {
  return await api.put(`/routes/${route._id}`, {driverId, ...route});
};

const fetchRoutes = async (driverId: string) => {
  return await api.get(`/routes/${driverId}`);
};

const filterRoutes = async (date: Date, from: string, to: string) => {
  return await api.post('/routes/filter', {date, from, to});
};

const deleteRoute = async (routeId: string) => {
  return await api.delete(`routes/${routeId}`);
};

export {createRoute, fetchRoutes, updateRoute, filterRoutes, deleteRoute};
