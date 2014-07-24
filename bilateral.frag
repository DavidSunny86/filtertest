#version 330

// 5x5 �o�C���e�����t�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

const float sigma = -100.0;

// �I�t�Z�b�g
const ivec2 offset[] = ivec2[](

  ivec2(-2, -2),
  ivec2(-1, -2),
  ivec2( 0, -2),
  ivec2( 1, -2),
  ivec2( 2, -2),
        
  ivec2(-2, -1),
  ivec2(-1, -1),
  ivec2( 0, -1),
  ivec2( 1, -1),
  ivec2( 2, -1),
        
  ivec2(-2,  0),
  ivec2(-1,  0),
  ivec2( 1,  0),
  ivec2( 2,  0),
        
  ivec2(-2,  1),
  ivec2(-1,  1),
  ivec2( 0,  1),
  ivec2( 1,  1),
  ivec2( 2,  1),
        
  ivec2(-2,  2),
  ivec2(-1,  2),
  ivec2( 0,  2),
  ivec2( 1,  2),
  ivec2( 2,  2)

);

// ���U
const float variance1 = 1.0;
const float variance2 = 100.0;

// ���ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 base = csum;
  vec4 wsum = vec4(1.0);
  
  for (int i = 0; i < offset.length(); ++i)
  {
    float o = vec2(offset[i]);
    float w = exp(-0.5 * dot(o, o) / variance1);
    vec4 c = textureOffset(image, gl_FragCoord.xy, offset[i]);
    vec4 d = c - base;
    vec4 e = exp(-0.5 * d * d / variance2) * w;
    wsum += e;
    csum += c * e;
  }

  fc = csum / wsum;
}
