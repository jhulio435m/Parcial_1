import React, { useState } from 'react';
import { Server } from '../../types';
import { mockServers } from '../../data/mockData';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { UserCircle, Clock } from 'lucide-react';

const ServerManagement: React.FC = () => {
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editShift, setEditShift] = useState('');
  
  const shiftColors = {
    morning: 'bg-yellow-100 text-yellow-800',
    evening: 'bg-indigo-100 text-indigo-800',
    both: 'bg-teal-100 text-teal-800',
  };
  
  const shiftOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'evening', label: 'Evening' },
    { value: 'both', label: 'Both' },
  ];
  
  const toggleServerAvailability = (serverId: string) => {
    setServers(prev => 
      prev.map(server => 
        server.id === serverId
          ? { ...server, isAvailable: !server.isAvailable }
          : server
      )
    );
  };
  
  const handleServerSelect = (serverId: string) => {
    setSelectedServerId(serverId === selectedServerId ? null : serverId);
    setIsEditing(false);
  };
  
  const startEditing = (server: Server) => {
    setEditName(server.name);
    setEditShift(server.shift);
    setIsEditing(true);
  };
  
  const saveChanges = () => {
    if (selectedServerId) {
      setServers(prev => 
        prev.map(server => 
          server.id === selectedServerId
            ? { 
                ...server, 
                name: editName,
                shift: editShift as 'morning' | 'evening' | 'both',
              }
            : server
        )
      );
      setIsEditing(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6">Server Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Servers Overview</h3>
              <div className="flex space-x-2">
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Morning</span>
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">Evening</span>
                <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">Both</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {servers.map(server => (
                <button
                  key={server.id}
                  onClick={() => handleServerSelect(server.id)}
                  className={`
                    w-full text-left rounded-lg border p-4 transition-all duration-200
                    ${selectedServerId === server.id ? 'border-primary-500 shadow-md' : 'border-gray-200'}
                    ${server.isAvailable ? 'bg-white' : 'bg-gray-100'}
                  `}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <UserCircle className="h-8 w-8 mr-3 text-primary-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{server.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className={`text-xs px-2 py-0.5 rounded-full ${shiftColors[server.shift]}`}>
                            {server.shift === 'both' ? 'Both Shifts' : `${server.shift.charAt(0).toUpperCase() + server.shift.slice(1)} Shift`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        server.isAvailable
                          ? 'bg-success-500 bg-opacity-10 text-success-500'
                          : 'bg-error-500 bg-opacity-10 text-error-500'
                      }`}
                    >
                      {server.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <h3 className="text-lg font-semibold mb-4">Server Details</h3>
            
            {selectedServerId ? (
              (() => {
                const selectedServer = servers.find(server => server.id === selectedServerId);
                
                if (!selectedServer) return <p>Server not found</p>;
                
                return (
                  <div>
                    {isEditing ? (
                      <div className="mb-6">
                        <Input
                          label="Name"
                          id="serverName"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          required
                        />
                        
                        <Select
                          label="Shift"
                          id="serverShift"
                          value={editShift}
                          onChange={(e) => setEditShift(e.target.value)}
                          options={shiftOptions}
                          required
                        />
                        
                        <div className="flex space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          
                          <Button
                            variant="primary"
                            onClick={saveChanges}
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-6">
                          <div className="flex items-center mb-4">
                            <UserCircle className="h-12 w-12 mr-3 text-primary-500" />
                            <h4 className="text-xl font-display font-semibold">{selectedServer.name}</h4>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-primary-500" />
                              <span>Shift: {selectedServer.shift === 'both' ? 'Both Shifts' : `${selectedServer.shift.charAt(0).toUpperCase() + selectedServer.shift.slice(1)} Shift`}</span>
                            </div>
                            
                            <div className="pt-2">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                                  selectedServer.isAvailable
                                    ? 'bg-success-500 bg-opacity-10 text-success-500'
                                    : 'bg-error-500 bg-opacity-10 text-error-500'
                                }`}
                              >
                                {selectedServer.isAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            onClick={() => startEditing(selectedServer)}
                            fullWidth
                          >
                            Edit Server
                          </Button>
                          
                          <Button
                            variant={selectedServer.isAvailable ? 'outline' : 'primary'}
                            onClick={() => toggleServerAvailability(selectedServer.id)}
                            fullWidth
                          >
                            {selectedServer.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a server to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServerManagement;