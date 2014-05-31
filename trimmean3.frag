#version 150 core
#extension GL_ARB_explicit_attrib_location: enable

// 3x3 �̍ő�l�ƍŏ��l���������ړ����σt�B���^

uniform sampler2DRect color;

layout (location = 0) out vec4 fc;

// ���v�ƍő�l�ƍŏ��l�����߂�
void calc(in vec4 c, inout vec4 csum, inout vec4 cmax, inout vec4 cmin)
{
  csum += c;
  cmax = max(c, cmax);
  cmin = min(c, cmin);
}

void main(void)
{
  vec4 csum = texture(color, gl_FragCoord.xy);
  vec4 cmax = csum;
  vec4 cmin = csum;
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0, -1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1, -1)), csum, cmin, cmax);
  
  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  0)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  0)), csum, cmin, cmax);

  calc(textureOffset(color, gl_FragCoord.xy, ivec2(-1,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 0,  1)), csum, cmin, cmax);
  calc(textureOffset(color, gl_FragCoord.xy, ivec2( 1,  1)), csum, cmin, cmax);
  
  fc = (csum - cmax - cmin) * 0.14285714;
}
