export interface IUseCase<T = object, R = void> {
    execute(param: T): Promise<R>
}