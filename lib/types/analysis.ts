export interface CorrosionAnalysis {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  originalFilename: string;
  corrosionPercentage: number;
  confidenceScore: number;
  pixelsTotal: number;
  pixelsCorrupted: number;
  status: 'approved' | 'inspection' | 'rejected';
  operator: string;
  pieceType: string;
  batchId?: string;
  notes?: string;
  attachments?: string[];
  roi?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  heatmapUrl?: string;
  maskUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface BatchProcessing {
  id: string;
  name: string;
  totalFiles: number;
  processedFiles: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  analyses: CorrosionAnalysis[];
  createdAt: Date;
  updatedAt: Date;
  averageCorrosion?: number;
  summary?: {
    approved: number;
    inspection: number;
    rejected: number;
  };
}

export interface CalibrationProfile {
  id: string;
  name: string;
  description?: string;
  pixelsPerMm: number;
  referenceImageUrl?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditEvent {
  id: string;
  timestamp: Date;
  userId: string;
  userEmail: string;
  action: 'login' | 'logout' | 'capture' | 'analyze' | 'approve' | 'reject' | 'export' | 'config_change';
  details: Record<string, any>;
  resourceId?: string;
  resourceType?: string;
  ipAddress?: string;
}

export interface PieceType {
  id: string;
  code: string;
  name: string;
  description?: string;
  tolerancePercentage: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}