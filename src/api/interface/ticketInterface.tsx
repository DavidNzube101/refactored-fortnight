export interface TicketInterface {
    success?: boolean;
    ticketData?: ticketDataInterface;
    priorityData?: priorityDataInterface;
    departmentData?: departmentDataInterface;
    messageData?:messageDataInterface;
    loading?: boolean
}


export interface ticketDataInterface{

}

export interface priorityDataInterface{
    // id: number,
    // name: string,
    // slug: string,
    // color: string,
    // response_in: string,
    // response_value_in: string,
    // resolve_in: number,
    // resolve_value_in: string,
    // status: number,
    // system_reserve: number,
    // created_by_id: number,
    // created_at: string,
    // updated_at: string,
    // deleted_at: string
}

export interface departmentDataInterface{

}





export interface messageDataInterface {
    
}