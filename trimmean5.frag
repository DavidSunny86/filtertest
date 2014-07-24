#version 330

// 3x3 �̍ő�l�ƍŏ��l���������ړ����σt�B���^

uniform sampler2DRect image;

layout (location = 0) out vec4 fc;

// ��f�l�Ƃ��̍ő�l�E�ŏ��l�����߂�
vec4 f(inout vec4 cmin, inout vec4 cmax, const in ivec2 o)
{
  vec4 c = textureOffset(dmap, gl_FragCoord.xy, o);
  cmax = max(c, cmax);
  cmin = min(c, cmin);
  return c;
}

// �ő�l�ƍŏ��l���܂܂Ȃ����ς����߂�
void main(void)
{
  vec4 csum = texture(image, gl_FragCoord.xy);
  vec4 cmin = csum;
  vec4 cmax = csum;

  csum += f(cmin, cmax, ivec2(-2, -2));
  csum += f(cmin, cmax, ivec2(-1, -2));
  csum += f(cmin, cmax, ivec2( 0, -2));
  csum += f(cmin, cmax, ivec2( 1, -2));
  csum += f(cmin, cmax, ivec2( 2, -2));
        
  csum += f(cmin, cmax, ivec2(-2, -1));
  csum += f(cmin, cmax, ivec2(-1, -1));
  csum += f(cmin, cmax, ivec2( 0, -1));
  csum += f(cmin, cmax, ivec2( 1, -1));
  csum += f(cmin, cmax, ivec2( 2, -1));
        
  csum += f(cmin, cmax, ivec2(-2,  0));
  csum += f(cmin, cmax, ivec2(-1,  0));
  csum += f(cmin, cmax, ivec2( 1,  0));
  csum += f(cmin, cmax, ivec2( 2,  0));
        
  csum += f(cmin, cmax, ivec2(-2,  1));
  csum += f(cmin, cmax, ivec2(-1,  1));
  csum += f(cmin, cmax, ivec2( 0,  1));
  csum += f(cmin, cmax, ivec2( 1,  1));
  csum += f(cmin, cmax, ivec2( 2,  1));
        
  csum += f(cmin, cmax, ivec2(-2,  2));
  csum += f(cmin, cmax, ivec2(-1,  2));
  csum += f(cmin, cmax, ivec2( 0,  2));
  csum += f(cmin, cmax, ivec2( 1,  2));
  csum += f(cmin, cmax, ivec2( 2,  2));

  fc = (csum - cmin - cmax) * 0.043478261;
}
