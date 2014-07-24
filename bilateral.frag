#version 330

// 5x5 �o�C���e�����t�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ���U
const float variance1 = 1.0;
const float variance2 = 100.0;

// �d�ݕt����f�l�̍��v�Əd�݂̍��v�����߂�
void f(inout vec4 csum, inout vec4 wsum, const in vec4 base, const in vec4 c, const in ivec2 o)
{
  vec2 x = vec2(o);
  float w = exp(-0.5 * dot(x, x) / variance1);
  vec4 d = c - base;
  vec4 e = exp(-0.5 * d * d / variance2) * w;
  csum += c * w;
  wsum += w;
}

// ���ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 wsum = vec4(1.0);
  vec4 base = csum;
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -2)), ivec2(-2, -2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -2)), ivec2(-1, -2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -2)), ivec2( 0, -2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -2)), ivec2( 1, -2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -2)), ivec2( 2, -2));
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2, -1)), ivec2(-2, -1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1, -1)), ivec2(-1, -1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0, -1)), ivec2( 0, -1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1, -1)), ivec2( 1, -1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2, -1)), ivec2( 2, -1));
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  0)), ivec2(-2,  0));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  0)), ivec2(-1,  0));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  0)), ivec2( 1,  0));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  0)), ivec2( 2,  0));
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  1)), ivec2(-2,  1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  1)), ivec2(-1,  1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  1)), ivec2( 0,  1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  1)), ivec2( 1,  1));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  1)), ivec2( 2,  1));
  
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-2,  2)), ivec2(-2,  2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2(-1,  2)), ivec2(-1,  2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 0,  2)), ivec2( 0,  2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 1,  2)), ivec2( 1,  2));
  f(csum, wsum, base, textureOffset(image, gl_FragCoord.xy, ivec2( 2,  2)), ivec2( 2,  2));

  fc = csum / wsum;
}
