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
   * Subtract two vectors
   */
  public static subtract(a: Vector2D, b: Vector2D): Vector2D {
    return new Vector2D(a.x - b.x, a.y - b.y)
  }

  /**
   * Multiply a vector by a scalar
   */
  public static times(vector: Vector2D, scalar: number): Vector2D {
    return new Vector2D(vector.x * scalar, vector.y * scalar)
  }

  /**
   * Divide a vector by a scalar
   */
  public divideBy(vector: Vector2D, scalar: number): Vector2D {
    return new Vector2D(vector.x / scalar, vector.y / scalar)
  }

  /**
   * Get the length of the vector
   */
  public get length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  /**
   * Normalise the vector
   * @returns the vector after normalisation
   */
  public normalise(): Vector2D {
    const length = this.length
    this.x /= length
    this.y /= length
    return this
  }

  /**
   * Get the absolute values of the vector
   * @returns the vector
   */
  public absolute(): Vector2D {
    this.x = Math.abs(this.x)
    this.y = Math.abs(this.y)
    return this
  }

  /**
   * Get a new vector with the same values
   */
  public clone(): Vector2D {
    return new Vector2D(this.x, this.y)
  }
}
