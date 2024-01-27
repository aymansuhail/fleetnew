import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditableField from '../../../components/Input/EditableField';

const DriverProfile = () => {
  const { id, firstname } = useParams();
  const [driver, setDriver] = useState({
    id: null,
    firstname: null,
    phone: null,
    vehicleAssigned: null,
    cdl: null,
    status: null,
  });

  useEffect(() => {
    setDriver({
      id,
      firstname,
      phone: null,
      vehicleAssigned: null,
      cdl: null,
      status: null,
    });
  }, [id, firstname]);

  return (
    <div className="max-w-50% mx-auto overflow-hidden bg-base-100  shadow-inherit rounded-md mt-8 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Driver Profile</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="text-white">ID</th>
              <td>{driver.id}</td>
            </tr>
            <tr>
              <th className="text-white">First Name</th>
              <td>{driver.firstname}</td>
            </tr>
            <tr>
              <th className="text-white">Phone</th>
              <td>
                <EditableField
                  label="Phone"
                  value={driver.phone || 'set phone'}
                  onChange={(value) => setDriver({ ...driver, phone: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Vehicle Assigned</th>
              <td>
                <EditableField
                  label="Vehicle Assigned"
                  value={driver.vehicleAssigned || 'assign a vehicle'}
                  onChange={(value) => setDriver({ ...driver, vehicleAssigned: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">CDL</th>
              <td>
                <EditableField
                  label="CDL"
                  value={driver.cdl || 'add cdl'}
                  onChange={(value) => setDriver({ ...driver, cdl: value })}
                />
              </td>
            </tr>
            <tr>
              <th className="text-white">Status</th>
              <td>
                <EditableField
                  label="Status"
                  value={driver.status || 'set status'}
                  onChange={(value) => setDriver({ ...driver, status: value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverProfile;
