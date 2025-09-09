import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
    onModeChange?: () => void;
}

type ConnectionStatus = 'connected' | 'disconnected' | 'checking';

export function ConnectionStatus({ onModeChange }: ConnectionStatusProps) {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('checking');
    const [isDummyMode, setIsDummyMode] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const updateStatus = useCallback(() => {
        setConnectionStatus(productService.getConnectionStatus());
        setIsDummyMode(productService.isUsingDummy());
    }, []);

    useEffect(() => {
        updateStatus();
        const interval = setInterval(updateStatus, 5000);
        return () => clearInterval(interval);
    }, [updateStatus]);

    const handleSwitchToApi = useCallback(async () => {
        setIsChecking(true);
        try {
        const success = await productService.switchToApiMode();
        if (success) {
            updateStatus();
            onModeChange?.();
        }
        } catch {
        // Silent fail - status will be updated by interval
        }
        setIsChecking(false);
    }, [updateStatus, onModeChange]);

    const handleSwitchToDummy = useCallback(async () => {
        await productService.switchToDummyMode();
        updateStatus();
        onModeChange?.();
    }, [updateStatus, onModeChange]);

    const handleCheckConnection = useCallback(async () => {
        setIsChecking(true);
        try {
        await productService.checkConnection();
        updateStatus();
        } catch {
        // Silent fail - status will be updated by interval
        }
        setIsChecking(false);
    }, [updateStatus]);

    const getStatusText = (): string => {
        if (isChecking) return 'Verificando...';
        if (isDummyMode) return 'Modo Datos Dummy (localStorage)';
        return connectionStatus === 'connected' ? 'API Conectada' : 'API Desconectada';
    };

    const getStatusClass = (): string => {
        if (isChecking) return 'checking';
        if (isDummyMode) return 'dummy';
        return connectionStatus;
    };

    return (
        <div className="connection-status">
            <div className={`status-indicator ${getStatusClass()}`}>
                <span className="status-dot"></span>
                <span className="status-text">{getStatusText()}</span>
            </div>
            <div className="status-actions">
                {isDummyMode ? (
                <button
                    onClick={handleSwitchToApi}
                    disabled={isChecking}
                    className="btn-switch"
                >
                    {isChecking ? 'Conectando...' : 'Conectar a API'}
                </button>
                ) : (
                <>
                    <button
                    onClick={handleCheckConnection}
                    disabled={isChecking}
                    className="btn-check"
                    >
                    {isChecking ? 'Verificando...' : 'Verificar Conexión'}
                    </button>
                    {connectionStatus === 'disconnected' && (
                    <button
                        onClick={handleSwitchToDummy}
                        className="btn-dummy"
                    >
                        Usar Datos Dummy
                    </button>
                    )}
                </>
                )}
            </div>
        </div>
    );
}
