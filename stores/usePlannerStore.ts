import { defineStore } from 'pinia';

export interface House {
  id: number
  region: string
  type: string
  name: string
  price: number
  img: string
  tags: string[]
  layout: string
}

export interface CostsData {
  renovation: number
  furniture: number
  taxes: number
  misc: number
}

export const usePlannerStore = defineStore('planner', {
  state: () => ({
    // 流程控制
    currentStep: 1,
    maxReachedStep: 1,
    
    // 财务数据
    currentSavings: 1000000,
    monthlySalary: 70000,
    dailyFood: 500,
    monthlyTransport: 3000,
    monthlyRent: 15000,
    monthlyEntertainment: 5000,
    
    // 房屋筛选
    filterRegion: '北',
    filterType: '全部',
    selectedHouse: null as House | null,
    
    // 预算数据
    downPaymentRate: 20,
    costsData: {
      renovation: 1500000,
      furniture: 500000,
      taxes: 250000,
      misc: 50000
    } as CostsData,
    
    // 合约状态
    contractPage: 0,
    contractAccepted: false
  }),

  getters: {
    // 月度餐费
    monthlyFood: state => state.dailyFood * 30,
    
    // 总开支
    totalExpenses(): number {
      return this.monthlyFood + this.monthlyTransport + this.monthlyRent + this.monthlyEntertainment;
    },
    
    // 月度储蓄
    monthlySavings(): number {
      return this.monthlySalary - this.totalExpenses;
    },
    
    // 财务是否有效
    isFinanceValid(): boolean {
      return this.monthlySalary > 0 && this.monthlySavings > 0 && this.currentSavings >= 0;
    },
    
    // 目标房价
    targetHousePrice: state => state.selectedHouse ? state.selectedHouse.price : 0,
    
    // 目标头期款
    targetDownPayment(): number {
      return this.targetHousePrice * (this.downPaymentRate / 100);
    },
    
    // 目标总现金
    targetTotalCash(): number {
      return this.targetDownPayment + this.costsData.renovation
        + this.costsData.furniture + this.costsData.taxes + this.costsData.misc;
    },
    
    // 现金流数据
    cashFlowData(): Array<{ name: string, value: number, color: string }> {
      return [
        { name: '餐飲花費', value: this.monthlyFood, color: '#F43F5E' },
        { name: '居住交通', value: this.monthlyRent + this.monthlyTransport, color: '#F97316' },
        { name: '娛樂雜支', value: this.monthlyEntertainment, color: '#8B5CF6' },
        { name: '每月可存金額', value: this.monthlySavings > 0 ? this.monthlySavings : 0, color: '#10B981' }
      ];
    },
    
    // 成本饼图数据
    costsPieData(): Array<{ name: string, value: number, color: string }> {
      return [
        { name: '頭期款', value: this.targetDownPayment, color: '#3B82F6' },
        { name: '裝潢工程', value: this.costsData.renovation, color: '#F59E0B' },
        { name: '家具家電', value: this.costsData.furniture, color: '#10B981' },
        { name: '稅費雜支', value: this.costsData.taxes + this.costsData.misc, color: '#F97316' }
      ];
    },
    
    // 预测数据
    projectionData(): Array<{ year: string, assets: number, target: number, houseValue: number }> {
      if (!this.selectedHouse) {
        return [];
      }

      let assets = this.currentSavings;
      let houseValue = this.targetHousePrice;
      const data = [];
      const annualSavings = this.monthlySavings * 12;
      
      for (let year = 0; year <= 10; year++) {
        if (year > 0) {
          assets = assets * 1.05 + annualSavings; // 5% 回报
          houseValue = houseValue * 1.025; // 2.5% 增值
        }
        data.push({
          year: `第 ${year} 年`,
          assets: Math.round(assets),
          target: this.targetTotalCash,
          houseValue: Math.round(houseValue)
        });
      }
      return data;
    },

    // 达成目标需要的年数
    yearsToGoal(): number {
      const index = this.projectionData.findIndex(d => d.assets >= this.targetTotalCash);
      return index;
    }
  },

  actions: {
    // 验证当前步骤是否完成
    validateCurrentStep(): boolean {
      switch (this.currentStep) {
        case 1: // 财务数据验证
          return this.isFinanceValid;
        case 2: // 房屋选择验证
          return this.selectedHouse !== null;
        case 3: // 预算数据验证
          return this.downPaymentRate > 0 && this.targetTotalCash > 0;
        case 4: // 合约验证
          return this.contractAccepted;
        default:
          return true;
      }
    },
    
    // 检查是否可以进入指定步骤
    canAccessStep(step: number): boolean {
      // 第一步总是可以访问
      if (step === 1) {
        return true;
      }

      // 只能访问已达到的步骤或下一步
      if (step <= this.maxReachedStep) {
        return true;
      }

      // 如果当前步骤已完成，可以访问下一步
      if (step === this.currentStep + 1 && this.validateCurrentStep()) {
        return true;
      }

      return false;
    },
    
    setStep(step: number) {
      if (this.canAccessStep(step)) {
        this.currentStep = step;
      }
    },
    
    nextStep() {
      // 验证当前步骤
      if (!this.validateCurrentStep()) {
        return false;
      }

      const next = this.currentStep + 1;
      this.currentStep = next;
      if (next > this.maxReachedStep) {
        this.maxReachedStep = next;
      }

      return true;
    },
    
    prevStep() {
      this.currentStep = Math.max(1, this.currentStep - 1);
    },
    
    setFinanceData(data: any) {
      Object.assign(this, data);
    },
    
    selectHouse(house: House) {
      this.selectedHouse = house;
    },
    
    setCostsData(costs: CostsData) {
      this.costsData = costs;
    },
    
    acceptContract() {
      this.contractAccepted = true;
    },
    
    reset() {
      this.$reset();
    }
  },

  persist: true
});
