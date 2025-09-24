import { 
  CorrosionAnalysis, 
  BatchProcessing, 
  CalibrationProfile, 
  AuditEvent 
} from '@/lib/types/analysis';
import { appConfig } from '../../app.config';

// Mock data generators
const generateMockAnalysis = (overrides: Partial<CorrosionAnalysis> = {}): CorrosionAnalysis => {
  const corrosionPercentage = Math.random() * 100;
  const status = 
    corrosionPercentage <= appConfig.corrosionThresholds.approved ? 'approved' :
    corrosionPercentage <= appConfig.corrosionThresholds.inspection ? 'inspection' :
    'rejected';

  return {
    id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    imageUrl: `https://picsum.photos/800/600?random=${Date.now()}`,
    thumbnailUrl: `https://picsum.photos/200/150?random=${Date.now()}`,
    originalFilename: `piece_${Date.now()}.jpg`,
    corrosionPercentage: Math.round(corrosionPercentage * 100) / 100,
    confidenceScore: Math.round((0.7 + Math.random() * 0.3) * 100) / 100,
    pixelsTotal: 480000, // 800x600
    pixelsCorrupted: Math.round(480000 * (corrosionPercentage / 100)),
    status,
    operator: 'Sistema Automatizado',
    pieceType: ['Parafuso M8', 'Porca M10', 'Arruela Lisa', 'Parafuso Phillips'][Math.floor(Math.random() * 4)],
    roi: {
      x: 100 + Math.random() * 200,
      y: 50 + Math.random() * 100,
      width: 400 + Math.random() * 200,
      height: 300 + Math.random() * 150,
    },
    heatmapUrl: `https://picsum.photos/800/600?random=${Date.now() + 1}`,
    maskUrl: `https://picsum.photos/800/600?random=${Date.now() + 2}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // últimos 30 dias
    updatedAt: new Date(),
    ...overrides,
  };
};

// Mock API functions
export const analysisApi = {
  // Analyze image
  analyzeImage: async (
    imageFile: File,
    options?: {
      roi?: { x: number; y: number; width: number; height: number };
      rustColor?: string;
      backgroundColor?: string;
    }
  ): Promise<CorrosionAnalysis> => {
    // Simula o tempo de processamento
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000));

    const analysis = generateMockAnalysis({
      originalFilename: imageFile.name,
      roi: options?.roi,
      operator: "Análise Manual",
    });

    // Store in localStorage for persistence
    const stored = localStorage.getItem('ciser-analyses');
    const analyses = stored ? JSON.parse(stored) : [];
    analyses.unshift(analysis);
    localStorage.setItem('ciser-analyses', JSON.stringify(analyses.slice(0, 100))); // guarda os últimos 100

    return analysis;
  },

  // Get analysis by ID
  getAnalysis: async (id: string): Promise<CorrosionAnalysis | null> => {
    const stored = localStorage.getItem('ciser-analyses');
    const analyses = stored ? JSON.parse(stored) : [];
    return analyses.find((a: CorrosionAnalysis) => a.id === id) || null;
  },

  // List analyses with pagination and filters
  listAnalyses: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    operator?: string;
    dateFrom?: Date;
    dateTo?: Date;
    search?: string;
  }): Promise<{ data: CorrosionAnalysis[]; total: number; page: number; totalPages: number }> => {
    // Get stored analyses or generate mock data
    let stored = localStorage.getItem('ciser-analyses');
    let analyses: CorrosionAnalysis[] = [];
    
    if (!stored) {
      // Generate initial mock data
      analyses = Array.from({ length: 50 }, () => generateMockAnalysis());
      localStorage.setItem('ciser-analyses', JSON.stringify(analyses));
    } else {
      analyses = JSON.parse(stored);
    }

    // Apply filters
    let filtered = analyses;
    
    if (params?.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(a => 
        a.originalFilename.toLowerCase().includes(search) ||
        a.pieceType.toLowerCase().includes(search) ||
        a.operator.toLowerCase().includes(search)
      );
    }

    if (params?.dateFrom) {
      filtered = filtered.filter(a => new Date(a.createdAt) >= params.dateFrom!);
    }

    if (params?.dateTo) {
      filtered = filtered.filter(a => new Date(a.createdAt) <= params.dateTo!);
    }

    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const offset = (page - 1) * limit;
    const paginatedData = filtered.slice(offset, offset + limit);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  // Update analysis status
  updateAnalysisStatus: async (id: string, status: 'approved' | 'inspection' | 'rejected', notes?: string): Promise<CorrosionAnalysis> => {
    const stored = localStorage.getItem('ciser-analyses');
    const analyses = stored ? JSON.parse(stored) : [];
    
    const index = analyses.findIndex((a: CorrosionAnalysis) => a.id === id);
    if (index === -1) throw new Error('Análise não encontrada');

    analyses[index] = {
      ...analyses[index],
      status,
      notes,
      updatedAt: new Date(),
      approvedAt: status === 'approved' ? new Date() : undefined,
      approvedBy: status === 'approved' ? 'current-user' : undefined,
    };

    localStorage.setItem('ciser-analyses', JSON.stringify(analyses));
    return analyses[index];
  },

  // Batch processing
  processBatch: async (files: File[]): Promise<BatchProcessing> => {
    const batch: BatchProcessing = {
      id: `batch-${Date.now()}`,
      name: `Lote ${new Date().toLocaleDateString('pt-BR')} - ${files.length} itens`,
      totalFiles: files.length,
      processedFiles: 0,
      status: 'processing',
      analyses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store batch
    const stored = localStorage.getItem('ciser-batches');
    const batches = stored ? JSON.parse(stored) : [];
    batches.unshift(batch);
    localStorage.setItem('ciser-batches', JSON.stringify(batches.slice(0, 20)));

    return batch;
  },

  // Get batch by ID
  getBatch: async (id: string): Promise<BatchProcessing | null> => {
    const stored = localStorage.getItem('ciser-batches');
    const batches = stored ? JSON.parse(stored) : [];
    return batches.find((b: BatchProcessing) => b.id === id) || null;
  },
};
