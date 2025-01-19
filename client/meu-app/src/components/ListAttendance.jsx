import React, { useState, useEffect } from 'react';
import api from '../routes/api';

function ListAttendance() {
    const [attendances, setAttendances] = useState([]);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [form, setForm] = useState({ name: '', phone: '', scheduling_time: '' }); 

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const { data } = await api.get('/attendances');
                setAttendances(data);
            } catch (error) {
                console.error('Erro ao buscar atendimentos:', error);
            }
        };

        fetchAttendances();
    }, []);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const date = new Date(form.scheduling_time);
            const time = new Date(date);

            const newForm = {
                ...form,
                scheduling_time: time.toISOString(),
            };

            if (editingAppointment !== null) {
                const { data } = await api.put(`/attendances/${editingAppointment.uuid}`, newForm);
                setAttendances((prev) =>
                    prev.map((appt) => (appt.uuid === editingAppointment.uuid ? data : appt))
                );
            } else {
                const { data } = await api.post('/attendances', newForm);
                setAttendances((prev) => [...prev, data]);
            }

            setForm({ name: '', phone: '', scheduling_time: '' });
            setEditingAppointment(null);
        } catch (error) {
            console.error('Erro ao salvar atendimento:', error);
        }
    };

    const handleEdit = (appt) => {
        setEditingAppointment(appt);
        setForm({
            name: appt.name,
            phone: appt.phone,
            scheduling_time: appt.scheduling_time.slice(0, 16),
        });
    };

    const handleDelete = async (uuid) => {
        try {
            await api.delete(`/attendances/${uuid}`);
            setAttendances((prev) => prev.filter((appt) => appt.uuid !== uuid));
        } catch (error) {
            console.error('Erro ao excluir atendimento:', error);
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatTime = (isoDate) => {
        const date = new Date(isoDate);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <div className="attendance-container">
            <h1 className="page-title">Gestão de Atendimentos</h1>

            {/* Formulário */}
            <form onSubmit={handleFormSubmit} className="form-container">
                <div className="form-group">
                    <label className="form-label">
                        Nome:
                        <input
                            placeholder='Nome do cliente'
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Telefone:
                        <input
                            placeholder='(99) 99999-9999'
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label className="form-label">
                        Data do agendamento:
                        <input
                            type="datetime-local"
                            name="scheduling_time"
                            value={form.scheduling_time}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">
                    {editingAppointment !== null ? 'Atualizar Atendimento' : 'Adicionar Atendimento'}
                </button>
            </form>

            {/* Lista de Atendimentos */}
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Data Agendamento</th>
                        <th>Hora Agendamento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances.length > 0 ? (
                        attendances.map((appt) => (
                            <tr key={appt.uuid}>
                                <td>{appt.name}</td>
                                <td>{appt.phone}</td>
                                <td>{formatDate(appt.scheduling_time)}</td>
                                <td>{formatTime(appt.scheduling_time)}</td>
                                <td>
                                    <button onClick={() => handleEdit(appt)} className="edit-button">Editar</button>
                                    <button onClick={() => handleDelete(appt.uuid)} className="delete-button">Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Nenhum atendimento registrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListAttendance;
