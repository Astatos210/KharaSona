import { ContractMetadata, ContractSymbol } from '../types';

export const CONTRACT_METADATA: Record<ContractSymbol, ContractMetadata> = {
  GOLDM: {
    symbol: 'GOLDM',
    name: 'Gold Mini Futures',
    contractSizeGrams: 100,
    quotationBasisGrams: 10,
    purity: 995,
    description: 'Gold Mini contract with 100 g lot size, traded in 10 g increments at 995 fineness.',
    lotDescription: '1 Lot = 100 g',
    tickSize: 1,
  },
  GOLDTEN: {
    symbol: 'GOLDTEN',
    name: 'Gold 10 Futures',
    contractSizeGrams: 10,
    quotationBasisGrams: 10,
    purity: 999,
    description: 'Gold 10 g contract quoted per 10 g with fine gold purity (999 fineness).',
    lotDescription: '1 Lot = 10 g',
    tickSize: 1,
  },
  GOLDGUINEA: {
    symbol: 'GOLDGUINEA',
    name: 'Gold Guinea Futures',
    contractSizeGrams: 8,
    quotationBasisGrams: 8,
    purity: 999,
    description: 'Traditional 1 sovereign / 8 g contract quoted per 8 g with fine purity (999 fineness).',
    lotDescription: '1 Lot = 8 g',
    tickSize: 1,
  },
  GOLDPETAL: {
    symbol: 'GOLDPETAL',
    name: 'Gold Petal Futures',
    contractSizeGrams: 1,
    quotationBasisGrams: 1,
    purity: 999,
    description: 'Micro 1 g contract quoted per 1 g with fine gold purity (999 fineness).',
    lotDescription: '1 Lot = 1 g',
    tickSize: 1,
  },
};

export const CONTRACT_LIST: ContractMetadata[] = Object.values(CONTRACT_METADATA);
