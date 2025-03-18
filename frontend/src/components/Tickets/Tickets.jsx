import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 10;
  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    user_nome: '',
    type: '',
    status: '',
    title: '',
    message: ''
  });
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Carregar os tickets da API
  useEffect(() => {
    axios.get('http://localhost:4000/api/tickets')
      .then(response => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os tickets:", error);
        setLoading(false);
      });
  }, []);

  // Páginação
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Função para adicionar um novo ticket
  const handleAddTicket = () => {
    axios.post('http://localhost:4000/api/tickets', newTicket)
      .then(response => {
        setTickets([response.data, ...tickets]);
        setShowModal(false);
        setNewTicket({
          user_nome: '',
          type: '',
          status: '',
          title: '',
          message: ''
        });
      })
      .catch(error => console.error("Erro ao adicionar ticket", error));
  };

  // Função para deletar um ticket
  const handleDeleteTicket = () => {
    axios.delete(`http://localhost:4000/api/tickets/${ticketToDelete}`)
      .then(() => {
        setTickets(tickets.filter(ticket => ticket.id !== ticketToDelete));
        setShowConfirmDelete(false);
      })
      .catch(error => console.error("Erro ao deletar ticket", error));
  };

  return (
    <div>
      {/* Botão para abrir o modal de criação de solicitação */}
      <button className='btn btn-primary mb-4' onClick={() => setShowModal(true)}>Criar Solicitação</button>

      {/* Tabela de Tickets */}
      {loading ? <p>Carregando...</p> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Usuário</th>
              <th scope="col">Tipo</th>
              <th scope="col">Status</th>
              <th scope="col">Título</th>
              <th scope="col">Mensagem</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map(ticket => (
              <tr key={ticket.id}>
                <th scope="row">{ticket.user_nome}</th>
                <td>{ticket.type}</td>
                <td>{ticket.status}</td>
                <td>{ticket.title}</td>
                <td>{ticket.message}</td>
                <td>
                  <button className="btn btn-warning me-2"><i className='bi bi-eye'></i></button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setTicketToDelete(ticket.id);
                      setShowConfirmDelete(true);
                    }}
                  >
                    <i className='bi bi-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginação */}
      <div>
        <ul className="pagination">
          {[...Array(Math.ceil(tickets.length / ticketsPerPage))].map((_, index) => (
            <li key={index} className="page-item">
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal para adicionar uma nova solicitação */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Solicitação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.user_nome}
                onChange={(e) => setNewTicket({ ...newTicket, user_nome: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.type}
                onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.status}
                onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mensagem</label>
              <textarea
                className="form-control"
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddTicket}>
            Adicionar Solicitação
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação para deletar ticket */}
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir esta solicitação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteTicket}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tickets;
