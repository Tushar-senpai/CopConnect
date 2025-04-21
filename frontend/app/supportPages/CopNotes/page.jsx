'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Save, X, Clock, Trash2 } from 'lucide-react';
import axios from 'axios';

const CopNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');

  const noteColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
  const backendURL = 'http://localhost:5001/notes';

  // Fetch all notes from backend
  useEffect(() => {
    axios.get(backendURL)
      .then(res => {
        setNotes(res.data);
        if (res.data.length > 0) setSelectedNote(res.data[0]);
      })
      .catch(err => console.error('Failed to fetch notes:', err));
  }, []);

  const handleSelectNote = (note) => setSelectedNote(note);

  const handleNoteContentChange = async (e) => {
    const updatedNote = {
      ...selectedNote,
      content: e.target.value,
      timestamp: new Date().toISOString(),
    };
    setSelectedNote(updatedNote);
    await axios.put(`${backendURL}/${selectedNote.id}`, updatedNote);
    setNotes(notes.map(n => (n.id === selectedNote.id ? updatedNote : n)));
  };

  const handleAddNewNote = () => {
    setIsAddingNote(true);
    setSelectedColor(noteColors[Math.floor(Math.random() * noteColors.length)]);
  };

  const createNewNote = async () => {
    if (!newNoteTitle.trim()) return;

    const newNote = {
      title: newNoteTitle,
      content: '',
      color: selectedColor,
      timestamp: new Date().toISOString(),
    };

    const res = await axios.post(backendURL, newNote);
    setNotes(prev => [...prev, res.data]);
    setSelectedNote(res.data);
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  const cancelNewNote = () => {
    setNewNoteTitle('');
    setIsAddingNote(false);
  };

  const deleteNote = async (id) => {
    await axios.delete(`${backendURL}/${id}`);
    const filtered = notes.filter(note => note.id !== id);
    setNotes(filtered);
    if (selectedNote?.id === id) setSelectedNote(filtered[0] || null);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getGradientStyle = (color) => ({
    background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
    borderLeft: `3px solid ${color}`,
  });

  return (
    <div className="flex h-screen bg-[#0f1729] text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#1e293b] border-r border-[#2a3348] flex flex-col">
        <div className="p-5 border-b border-[#2a3348]">
          <h2 className="text-xl font-bold mb-3 flex items-center">
            <span className="mr-2 text-2xl">📝</span> Your Notes
          </h2>
          <div className="relative">
            <input
              className="w-full p-2 pl-9 border rounded-lg bg-[#111827] text-gray-200 focus:ring-[#3B82F6]"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-3">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              style={getGradientStyle(note.color)}
              className={`mb-2 p-3 rounded-lg cursor-pointer hover:bg-[#242e44] ${
                selectedNote?.id === note.id ? 'bg-[#3465af20]' : ''
              }`}
              onClick={() => handleSelectNote(note)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{note.title}</div>
                  <div className="text-xs text-gray-400 flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" /> {formatDate(note.timestamp)}
                  </div>
                </div>
                <button onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}>
                  <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#2a3348]">
          {isAddingNote ? (
            <div>
              <input
                placeholder="Note title"
                className="w-full p-2 mb-2 border rounded bg-[#111827] text-gray-200"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <div className="flex gap-2 mb-2">
                {noteColors.map(color => (
                  <div
                    key={color}
                    className={`h-5 w-5 rounded-full cursor-pointer ${selectedColor === color ? 'ring-2 ring-white' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-500 px-3 py-2 rounded" onClick={createNewNote}>
                  <Save size={16} className="inline mr-1" /> Save
                </button>
                <button className="px-3 py-2 rounded bg-gray-600" onClick={cancelNewNote}>
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button className="w-full bg-green-500 px-3 py-2 rounded text-white" onClick={handleAddNewNote}>
              <Plus size={16} className="inline mr-1" /> New Note
            </button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        {selectedNote ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedNote.title}</h2>
            <textarea
              value={selectedNote.content}
              onChange={handleNoteContentChange}
              className="w-full h-[80%] bg-[#111827] text-gray-200 p-4 rounded-lg focus:outline-none"
              placeholder="Write your note here..."
            />
          </>
        ) : (
          <div className="text-gray-400 text-lg">No note selected</div>
        )}
      </div>
    </div>
  );
};

export default CopNotes;
