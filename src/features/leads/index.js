import moment from "moment"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
import { deleteLead, getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { showNotification } from '../common/headerSlice'
import { Link } from "react-router-dom"
import { deleteLeadAsync } from "./leadSlice"
const TopSideButtons = () => {

    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Add New Driver", bodyType : MODAL_BODY_TYPES.LEAD_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}

function Leads(){

    const { leads, isLoading } = useSelector(state => state.leads);

    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeadsContent())
    }, [])

    
    const deleteCurrentLead = (id) => {
        console.log("Deleting lead with ID:", id);
    
        // Open a confirmation modal before deleting
        // dispatch(
        //   openModal({
        //     title: "Confirmation",
        //     bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        //     extraObject: {
        //       message: `Are you sure you want to delete this driver?`,
        //       type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
        //       id,
        //     },
        //   })
        // );
    
        // Dispatch the deleteLeadAsync action to handle the deletion logic
        dispatch(deleteLeadAsync(id))
          .then(() => {
            // If deletion is successful, show a success notification
            dispatch(showNotification({ message: "Driver deleted successfully", status: 1 }));
          })
          .catch(() => {
            // If deletion fails, show an error notification
            dispatch(showNotification({ message: "Failed to delete driver", status: 0 }));
          });
      };
    
    return(
        <>
            <TitleCard title="Drivers" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Created At</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads && leads.map((l) => (
                                <tr key={l.id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            {/* <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={l.avatar} alt="Avatar" />
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="font-bold">{l.firstname}</div>
                                                <div className="text-sm opacity-50">{l.lastname}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.email}</td>
                                   <td>{moment(l.updated).format("DD MMM YY HH:mm:ss")}</td>

                                    <td>{l.lastname}</td>
                                    <td>
                                    <button onClick={() => deleteCurrentLead(l.id)} className="btn btn-square btn-ghost inline-flex items-center">
                                        <TrashIcon className="w-5 pl-1 mr-2" />
                                        </button>

                                        <Link to={`/app/drivers/${l.id}/${encodeURIComponent(l.firstname)}`} className="ml-2">
                                        <button className="btn btn-square btn-ghost inline-flex items-center w-20">View details</button>
                                        </Link>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Leads