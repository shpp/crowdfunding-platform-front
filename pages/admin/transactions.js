import fetch from 'isomorphic-unfetch';
import Table from 'react-bootstrap/Table';

const ProjectTransactions = (props) => {

    console.log("props Transactons");
    console.log(props);
    const { transactions } = props;
    console.log(transactions);
    return ( <
        div className = "container" >
        <
        Table striped bordered hover size = "sm" >
        <
        thead >
        <
        tr >
        <
        th > # < /th> <
        th > Ім 'я</th> <
        th > Телефон < /th> <
        th > Сума < /th>              <
        /tr> <
        /thead> <
        tbody > {
            transactions.map((transaction, index) => ( <
                tr className = "project-table-row" >
                <
                td > { index + 1 } < /td> <
                td > { project.name } < /td> <
                td > { project.plannedSpendings } < /td> <
                td > { project.amount } < /td> <
                td > { project.amountFunded } < /td> <
                td > { project.published.toString() } < /td> <
                td > { project.completed.toString() } < /td> <
                /tr>         
            ))
        } <
        /tbody> <
        /Table> <
        /div>           
    )
}

ProjectTransactions.getInitialProps = async function getInitialProps(props) {
    const { query } = props;
    console.log("Initial props:");
    console.log(query);
    const { id } = props;
    console.log(id);
    const prefix = process.browser ? 'https://cors-anywhere.herokuapp.com/' : ''; // TODO: Remove when CORS will be fixed

    const transactionsRes = await fetch(`${prefix}https://donate.shpp.me/api/v1/transactions/list?project_id=${query}`);
    const transactions = await transactionsRes.json();

    return {
        transactions,
    };

}

export default ProjectTransactions;