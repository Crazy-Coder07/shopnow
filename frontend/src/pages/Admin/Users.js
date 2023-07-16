import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { useAuth } from '../../context/Auth';

const Users = () => {
  const [allUser, setAllUser] = useState([]);
  const [auth, setAuth] = useAuth();

  const getUsers = async (_id, value) => {
    try {
      const { data } = await axios.get(`/api/v1/auth/all-users`, {
        params: {
          status: value,
        },
      });
      setAllUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers(auth?.token); // Pass the token as an argument
  }, [auth?.token]);

  return (
    <Layout title={'Dashboard-All Users'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 text-center">
            <h1>All Users</h1>
            <div className="border shadow">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {allUser?.map((o, i) => (
                    <tr key={o._id}>
                      <td>{i + 1}</td>
                      <td>{o.name}</td>
                      <td>{o.email}</td>
                      <td>{o.phone}</td>
                      <td>{o.address}</td>
                    </tr>
                  ))}
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;

