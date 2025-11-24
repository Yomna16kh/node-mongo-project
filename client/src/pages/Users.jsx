import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      setError('שגיאה בטעינת המשתמשים');
    } finally {
      setLoading(false);
    }
  };

  const toggleBusinessStatus = async (userId) => {
    try {
      const response = await axios.patch(`/users/${userId}`);
      setUsers(users.map(user => 
        user._id === userId ? response.data : user
      ));
    } catch (error) {
      setError('שגיאה בשינוי הסטטוס');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) {
      return;
    }

    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('שגיאה במחיקת המשתמש');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ניהול משתמשים
          </h1>
          <p className="text-lg text-gray-600">
            נהל את כל המשתמשים במערכת
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    משתמש
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    פרטי קשר
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    סטטוס
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    תאריך הצטרפות
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    פעולות
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.image?.url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"}
                          alt={user.name?.first}
                        />
                        <div className="mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name?.first} {user.name?.last}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone}</div>
                      <div className="text-sm text-gray-500">
                        {user.address?.city}, {user.address?.country}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isBusiness 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isBusiness ? 'עסקי' : 'רגיל'}
                        </span>
                        {user.isAdmin && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            אדמין
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('he-IL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleBusinessStatus(user._id)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          {user.isBusiness ? 'הפוך לרגיל' : 'הפוך לעסקי'}
                        </button>
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            מחק
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">אין משתמשים להצגה</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
