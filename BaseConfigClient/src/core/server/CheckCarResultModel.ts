export class CheckCarResultModel{
    redisId: string;
    imageUrl: string;
    uri: string;
    vehicleInfo: [{
        brand: any,
        brands: Array<any>,
        driverPos: any
    }]
}