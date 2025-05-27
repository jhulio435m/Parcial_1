import React, { useState } from 'react';
import { Table } from '../../types';
import { mockTables } from '../../data/mockData';
import Card from '../common/Card';
import Button from '../common/Button';
import { Users, MapPin } from 'lucide-react';

const TableManagement: React.FC = () => {
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  
  const locationColors = {
    indoor: 'bg-blue-100 text-blue-800',
    outdoor: 'bg-green-100 text-green-800',
    bar: 'bg-purple-100 text-purple-800',
  };
  
  const toggleTableAvailability = (tableId: string) => {
    setTables(prev => 
      prev.map(table => 
        table.id === tableId
          ? { ...table, isAvailable: !table.isAvailable }
          : table
      )
    );
  };
  
  const handleTableSelect = (tableId: string) => {
    setSelectedTableId(tableId === selectedTableId ? null : tableId);
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6">Table Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tables Overview</h3>
              <div className="flex space-x-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Indoor</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Outdoor</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">Bar</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tables.map(table => (
                <button
                  key={table.id}
                  onClick={() => handleTableSelect(table.id)}
                  className={`
                    rounded-lg border p-4 transition-all duration-200
                    ${selectedTableId === table.id ? 'border-primary-500 shadow-md' : 'border-gray-200'}
                    ${table.isAvailable ? 'bg-white' : 'bg-gray-100'}
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold">{table.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${locationColors[table.location]}`}>
                      {table.location.charAt(0).toUpperCase() + table.location.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{table.capacity}</span>
                  </div>
                  
                  <div className="mt-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        table.isAvailable
                          ? 'bg-success-500 bg-opacity-10 text-success-500'
                          : 'bg-error-500 bg-opacity-10 text-error-500'
                      }`}
                    >
                      {table.isAvailable ? 'Available' : 'Occupied'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <h3 className="text-lg font-semibold mb-4">Table Details</h3>
            
            {selectedTableId ? (
              (() => {
                const selectedTable = tables.find(table => table.id === selectedTableId);
                
                if (!selectedTable) return <p>Table not found</p>;
                
                return (
                  <div>
                    <div className="mb-6">
                      <h4 className="text-xl font-display font-semibold mb-2">{selectedTable.name}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-2 text-primary-500" />
                          <span>Capacity: {selectedTable.capacity} people</span>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                          <span>Location: {selectedTable.location.charAt(0).toUpperCase() + selectedTable.location.slice(1)}</span>
                        </div>
                        
                        <div className="pt-2">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                              selectedTable.isAvailable
                                ? 'bg-success-500 bg-opacity-10 text-success-500'
                                : 'bg-error-500 bg-opacity-10 text-error-500'
                            }`}
                          >
                            {selectedTable.isAvailable ? 'Available' : 'Occupied'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant={selectedTable.isAvailable ? 'outline' : 'primary'}
                      onClick={() => toggleTableAvailability(selectedTable.id)}
                      fullWidth
                    >
                      {selectedTable.isAvailable ? 'Mark as Occupied' : 'Mark as Available'}
                    </Button>
                  </div>
                );
              })()
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a table to view details</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TableManagement;