export class Vector2D {
  constructor(public x: number, public y: number) {}

  /**
   * Add another vector to this vector
   *
   * @param vector vector to add
   * @returns the vector after addition
   */
  public add(vector: Vector2D): Vector2D {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  /**
   * Multiply the vector by a scalar
   *
   * @param scalar scalar to multiply by
   * @returns the vector after multiplication
   */
  public times(scalar: number): Vector2D {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  /**
   * Divide the vector by a scalar
   *
   * @param scalar scalar to divide by
   * @returns the vector after division
   */
  public divideBy(scalar: number): Vector2D {
    this.x /= scalar
    this.y /= scalar
    return this
  }

  /**
   * Get the length of the vector
   */
  public get length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}
