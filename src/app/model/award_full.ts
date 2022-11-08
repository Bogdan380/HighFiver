export interface AwardFull {
    prodId: number,
    name: string,
    details: string,
    points: number,
    imageUrl: string,
    group: {
      groupId: number,
      groupName: string
    }
  }